package com.java.springboot.cruddemo.service;

import com.java.springboot.cruddemo.dao.OrderDetailsRepository;
import com.java.springboot.cruddemo.dao.OrderItemRepository;
import com.java.springboot.cruddemo.dao.OrderRepository;
import com.java.springboot.cruddemo.dao.UserRepository;
import com.java.springboot.cruddemo.entity.Order;
import com.java.springboot.cruddemo.entity.OrderDetails;
import com.java.springboot.cruddemo.entity.OrderItem;
import com.java.springboot.cruddemo.entity.OrderStatus;
import com.java.springboot.cruddemo.exception.ObjectNotFoundException;
import com.java.springboot.cruddemo.models.MyUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.never;

@Service
class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private  OrderDetailsRepository orderDetailsRepository;

    @Mock
    private  OrderItemRepository orderItemRepository;

    private OrderService underTest;

    @Captor
    private ArgumentCaptor<Order> orderArgumentCaptor;
    @Captor
    private ArgumentCaptor<UUID> uuidArgumentCaptor;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new OrderService(orderRepository, userRepository, orderDetailsRepository, orderItemRepository);
    }

    @Test
    void itShouldSaveNewOrder() {
        // given
        Order order = new Order("ordernumber", LocalDateTime.now(), "scheduled", OrderStatus.PENDING, 0, UUID.randomUUID(),
                new ArrayList<OrderItem>(), new OrderDetails());

        given(orderRepository.findById(1)).willReturn(Optional.empty());

        // when
        underTest.saveOrder(order);

        // then
        then(orderRepository).should().save(orderArgumentCaptor.capture());
        Order orderArgumentCaptorValue = orderArgumentCaptor.getValue();
        assertThat(orderArgumentCaptorValue).isEqualTo(order);
    }

    @Test
    void itShouldFindOrderById() {
        // given
        int theId = 1;
        Order order = new Order("ordernumber", LocalDateTime.now(), "scheduled", OrderStatus.PENDING, 0, UUID.randomUUID(),
                new ArrayList<OrderItem>(), new OrderDetails());

        given(orderRepository.findById(theId)).willReturn(Optional.of(order));

        // when
        underTest.findOrderById(theId);

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
        assertThatThrownBy(() -> underTest.findOrderById(theId))
                .isInstanceOf(ObjectNotFoundException.class)
                .hasMessageContaining("Did not find Order id " + theId);

        // then
        then(orderRepository).should(never()).getOne(theId);
    }

    @Test
    void itShouldFindOrdersByAccountId() {
        // given
        UUID theId = UUID.randomUUID();
        List<Order> orders = new ArrayList<>();
        MyUser user = new MyUser();

        given(userRepository.findByUuid(theId)).willReturn(Optional.of(user));
        given(orderRepository.findByAccount(theId)).willReturn(Optional.of(orders));

        // when
        underTest.findOrderByAccountId(theId);

        // then
        then(orderRepository).should().findByAccount(uuidArgumentCaptor.capture());

        UUID idValue = uuidArgumentCaptor.getValue();
        Optional<List<Order>> theOrders = orderRepository.findByAccount(idValue);
        assertThat(theOrders).isEqualTo(Optional.of(orders));
    }

    @Test
    void itShouldThrowIfAccountDoesNotExist() {
        // given
        UUID theId = UUID.randomUUID();
        given(orderRepository.findByAccount(theId)).willReturn(Optional.empty());

        // when
        assertThatThrownBy(() -> underTest.findOrderByAccountId(theId))
                .isInstanceOf(ObjectNotFoundException.class)
                .hasMessageContaining(String.format("User id %s not found", theId));

        // then
        then(orderRepository).should(never()).findByAccount(theId);
    }
}