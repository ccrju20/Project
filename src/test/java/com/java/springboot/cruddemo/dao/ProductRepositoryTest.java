package com.java.springboot.cruddemo.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.java.springboot.cruddemo.entity.Product;
import com.java.springboot.cruddemo.entity.ProductOption;

@DataJpaTest
class ProductRepositoryTest {

	@Autowired
	private ProductRepository underTest;

	@Test
	void itShouldSaveProduct() {
		// given
		List<ProductOption> options = new ArrayList<>();
		Product product = new Product("title", "description", "img", "cake", 1, options);

		// when
		underTest.save(product);

		// then
		Optional<Product> theProduct = underTest.findById(1);
		assertThat(theProduct).isPresent().hasValueSatisfying(p -> {
			assertThat(p).isEqualTo(product);
		});
	}

	@Test
	void itShouldGetPageOfProductsByCategory() {
		// given
		int pageNo = 0;
		Pageable pageable = PageRequest.of(pageNo, 2);
		String category = "cake";
		
		List<ProductOption> options = new ArrayList<>();
		Product product = new Product("title", "description", "img", category, 1, options);
		Product product2 = new Product("title2", "description2", "img2", category, 1, options);

		// when
		underTest.save(product);
		underTest.save(product2);
		Page<Product> pageProducts = underTest.findByCategory(category, pageable);
		List<Product> theProducts = pageProducts.getContent();
		
		// then
		assertThat(theProducts).hasSize(2).allMatch(p -> p.getCategory() == category);
	}
}
