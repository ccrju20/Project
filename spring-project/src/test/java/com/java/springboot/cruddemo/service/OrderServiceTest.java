package com.java.springboot.cruddemo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.never;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.java.springboot.cruddemo.dao.OrderRepository;
import com.java.springboot.cruddemo.dao.UserRepository;
import com.java.springboot.cruddemo.entity.Order;
import com.java.springboot.cruddemo.entity.OrderDetails;
import com.java.springboot.cruddemo.entity.OrderItem;
import com.java.springboot.cruddemo.models.MyUser;

class OrderServiceTest {

	@Mock
	private OrderRepository orderRepository;
	
	@Mock
	private UserRepository userRepository;

	private OrderService underTest;

	@Captor
	private ArgumentCaptor<Order> orderArgumentCaptor;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		underTest = new OrderService(orderRepository, userRepository);
	}

	@Test
	void itShouldSaveNewOrder() {
		// given
		Order order = new Order("ordernumber", "dateposted", "scheduled", "status", 0, new MyUser(),
				new ArrayList<OrderItem>(), new OrderDetails());

		given(orderRepository.findById(1)).willReturn(Optional.empty());

		// when
		underTest.save(order);

		// then
		then(orderRepository).should().save(orderArgumentCaptor.capture());
		Order orderArgumentCaptorValue = orderArgumentCaptor.getValue();
		assertThat(orderArgumentCaptorValue).isEqualTo(order);
	}
	
	@Test
	void itShouldFindOrderById() {
		// given
		int theId = 1;
		Order order = new Order("ordernumber", "dateposted", "scheduled", "status", 0, new MyUser(),
				new ArrayList<OrderItem>(), new OrderDetails());

		given(orderRepository.findById(theId)).willReturn(Optional.of(order));
		
		// when
		underTest.findById(theId);

		// then
        ArgumentCaptor<Integer> idArgumentCaptor = ArgumentCaptor.forClass(Integer.class);

		then(orderRepository).should().findById(idArgumentCaptor.capture());
		
		int idValue = idArgumentCaptor.getValue();
		Optional<Order> theOrder = orderRepository.findById(idValue);
		assertThat(theOrder).isEqualTo(Optional.of(order));
	}
	
	@Test
	void itShouldThrowIfOrderDoesNotExist() {
		// given
		int theId = 1;
		given(orderRepository.findById(theId)).willReturn(Optional.empty());
		
		// when
		assertThatThrownBy(() -> underTest.findById(theId))
			.isInstanceOf(RuntimeException.class)
			.hasMessageContaining("Did not find Order id - " + theId);
		
		// then
		then(orderRepository).should(never()).getOne(theId);
	}
	
	@Test
	void itShouldFindOrdersByAccountId() {
		// given
		int theId = 1;
		List<Order> orders = new ArrayList<>();
		MyUser user = new MyUser();
		
		given(userRepository.findById(theId)).willReturn(Optional.of(user));
		given(orderRepository.findByAccountId(theId)).willReturn(Optional.of(orders));
		
		// when
	    underTest.findByAccountId(theId);
		
		// then
        ArgumentCaptor<Integer> idArgumentCaptor = ArgumentCaptor.forClass(Integer.class);

		then(orderRepository).should().findByAccountId(idArgumentCaptor.capture());
		
		int idValue = idArgumentCaptor.getValue();
		Optional<List<Order>> theOrders = orderRepository.findByAccountId(idValue);
		assertThat(theOrders).isEqualTo(Optional.of(orders));
	}
	
	@Test
	void itShouldThrowIfAccountDoesNotExist() {
		// given
		int theId = 1;
		
		given(orderRepository.findByAccountId(theId)).willReturn(Optional.empty());
		
		// when
		assertThatThrownBy(() -> underTest.findByAccountId(theId))
			.isInstanceOf(RuntimeException.class)
			.hasMessageContaining("Did not find Orders with User id - " + theId);
		
		// then
		then(orderRepository).should(never()).getOne(theId);
	}

}
