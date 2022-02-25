package com.java.springboot.cruddemo.dao;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.validation.ConstraintViolationException;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

import com.java.springboot.cruddemo.entity.Order;
import com.java.springboot.cruddemo.entity.OrderDetails;
import com.java.springboot.cruddemo.entity.OrderItem;
import com.java.springboot.cruddemo.models.MyUser;

@DataJpaTest
class OrderRepositoryTest {

	@Autowired
	private OrderRepository underTest;

	@Test
	void itShouldSaveOrder() {
		// given
		List<OrderItem> orderItems = new ArrayList<>();
		OrderDetails orderDetails = new OrderDetails("first", "last", "test@gmail.com", "5555555555");

		Order order = new Order("ordernumber", "dateposted", "scheduled", "status", 0, new MyUser(), orderItems,
				orderDetails);

		// when
		underTest.save(order);

		// then
		Optional<Order> theOrder = underTest.findById(2);
		assertThat(theOrder).isPresent().hasValueSatisfying(o -> {
			assertThat(o).isEqualTo(order);
		});
	}

	@Test
	void itShouldNotSaveOrderIfOrderDetailsIsNull() {
		// given
		List<OrderItem> orderItems = new ArrayList<>();

		Order order = new Order("ordernumber", "dateposted", "scheduled", "status", 0, new MyUser(), orderItems, null);

		// when
		// then
		assertThatThrownBy(() -> underTest.save(order)).isInstanceOf(ConstraintViolationException.class)
				.hasMessageContaining("must not be null");
	}

	@Test
	void itShouldNotSaveOrderIfOrderItemsIsNull() {
		// given
		OrderDetails orderDetails = new OrderDetails("first", "last", "test@gmail.com", "5555555555");

		Order order = new Order("ordernumber", "dateposted", "scheduled", "status", 0, new MyUser(), null,
				orderDetails);

		// when
		// then
		assertThatThrownBy(() -> underTest.save(order)).isInstanceOf(ConstraintViolationException.class)
				.hasMessageContaining("must not be null");
	}

	@Test
	void itShouldNotSaveOrderIfScheduledIsEmpty() {
		// given
		List<OrderItem> orderItems = new ArrayList<>();
		OrderDetails orderDetails = new OrderDetails("first", "last", "test@gmail.com", "5555555555");

		Order order = new Order("ordernumber", "dateposted", "", "status", 0, new MyUser(), orderItems, orderDetails);

		// when
		// then
		assertThatThrownBy(() -> underTest.save(order)).isInstanceOf(ConstraintViolationException.class)
				.hasMessageContaining("must not be empty");
	}
	
	@Test
	void itShouldNotSaveOrderIfOrderNumberIsNull() {
		// given
		List<OrderItem> orderItems = new ArrayList<>();
		OrderDetails orderDetails = new OrderDetails("first", "last", "test@gmail.com", "5555555555");

		Order order = new Order(null, "dateposted", "scheduled", "status", 0, new MyUser(), orderItems, orderDetails);

		// when
		// then
		assertThatThrownBy(() -> underTest.save(order)).isInstanceOf(DataIntegrityViolationException.class)
				.hasMessageContaining("could not execute statement");
	}
	
	@Test
	void itShouldNotSaveOrderIfDatePostedIsNull() {
		// given
		List<OrderItem> orderItems = new ArrayList<>();
		OrderDetails orderDetails = new OrderDetails("first", "last", "test@gmail.com", "5555555555");

		Order order = new Order("ordernumber", null, "scheduled", "status", 0, new MyUser(), orderItems, orderDetails);

		// when
		// then
		assertThatThrownBy(() -> underTest.save(order)).isInstanceOf(DataIntegrityViolationException.class)
				.hasMessageContaining("could not execute statement");
	}

}
