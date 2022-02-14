package com.java.springboot.cruddemo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.never;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.math.NumberUtils;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.java.springboot.cruddemo.dao.ProductOptionsRepository;
import com.java.springboot.cruddemo.dao.ProductRepository;
import com.java.springboot.cruddemo.entity.Product;
import com.java.springboot.cruddemo.entity.ProductOption;

class ProductServiceTest {

	@Mock
	private ProductRepository productRepository;

	@Mock
	private ProductOptionsRepository productOptionsRepository;

	private ProductService underTest;

	@Captor
	private ArgumentCaptor<Product> productArgumentCaptor;

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		underTest = new ProductService(productRepository, productOptionsRepository);
	}

	@Test
	void itShouldSaveNewProduct() {
		// given
		Product product = new Product("title", "description", "img", "category", 1, new ArrayList<ProductOption>());

		given(productRepository.findById(1)).willReturn(Optional.empty());

		// when
		underTest.save(product);

		// then
		then(productRepository).should().save(productArgumentCaptor.capture());
		Product productArgumentCaptorValue = productArgumentCaptor.getValue();
		assertThat(productArgumentCaptorValue).isEqualTo(product);
	}

	@Test
	void itShouldFindProductById() {
		// given
		int theId = 1;
		Product product = new Product("title", "description", "img", "category", 1, new ArrayList<ProductOption>());

		given(productRepository.findById(theId)).willReturn(Optional.of(product));

		// when
		underTest.findById(theId);

		// then
		then(productRepository).should().findById(theId);
		Optional<Product> theProduct = productRepository.findById(theId);
		assertThat(theProduct).isEqualTo(Optional.of(product));
	}

	@Test
	void itShouldThrowIfProductDoesNotExist() {
		// given
		int theId = 1;
		given(productRepository.findById(theId)).willReturn(Optional.empty());
		
		// when
		assertThatThrownBy(() -> underTest.findById(theId))
			.isInstanceOf(RuntimeException.class)
			.hasMessageContaining("Did not find Product id - " + theId);
		
		// then
		then(productRepository).should(never()).getOne(theId);
	}
	
	@Test
	void itShouldFindPageOfProducts() {
		// given
		int pageNo = 1;
		int pageSize = 2;
		Pageable pageable = PageRequest.of(pageNo -1, pageSize);
		
		List<Product> products = new ArrayList<>();
		Page<Product> pagedProducts = new PageImpl<Product>(products);

		given(productRepository.findAll(pageable)).willReturn(pagedProducts);

		// when
		underTest.findPaginated(pageNo, pageSize);
		
		// then
		then(productRepository).should().findAll(pageable);
		Page<Product> thePageProducts = productRepository.findAll(pageable);
		assertThat(thePageProducts.getContent()).isEqualTo(products);
	}
	
	@Test
	void itShouldFindPageOfProductsByCategory() {
		// given
		int pageNo = 1;
		int pageSize = 2;
		Pageable pageable = PageRequest.of(pageNo -1, pageSize);
		
		List<Product> products = new ArrayList<>();
		Page<Product> pagedProducts = new PageImpl<Product>(products);

		given(productRepository.findByCategory("category", pageable)).willReturn(pagedProducts);

		// when
		underTest.findByCategory("category", pageNo, pageSize);
		
		// then
		then(productRepository).should().findByCategory("category", pageable);
		Page<Product> thePageProducts = productRepository.findByCategory("category", pageable);
		assertThat(thePageProducts.getContent()).isEqualTo(products);
	}
	
	@Test
	void itShouldFindPageOfProductsBySizeCategory() {
		// given
		String category = "1";
		int productSize = NumberUtils.createInteger(category);
		int pageNo = 1;
		int pageSize = 2;
		Pageable pageable = PageRequest.of(pageNo -1, pageSize);
		
		List<Product> products = new ArrayList<>();
		given(productOptionsRepository.findProductsBySize(productSize)).willReturn(products);

		// when
		underTest.findByCategory(category, pageNo, pageSize);
		
		// then
		then(productOptionsRepository).should().findProductsBySize(productSize);
		List<Product> theListProducts = productOptionsRepository.findProductsBySize(productSize);
		Page<Product> productsPage = new PageImpl<>(theListProducts, pageable, theListProducts.size());
		
		assertThat(productsPage.getContent()).isEqualTo(products);
	}
}
