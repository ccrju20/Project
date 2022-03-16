package com.java.springboot.cruddemo.service;

import com.java.springboot.cruddemo.dao.ProductOptionsRepository;
import com.java.springboot.cruddemo.dao.ProductRepository;
import com.java.springboot.cruddemo.entity.Product;
import com.java.springboot.cruddemo.entity.ProductOption;
import com.java.springboot.cruddemo.exception.ObjectNotFoundException;
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

import java.util.*;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.BDDMockito.*;
import static org.mockito.Mockito.*;

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
                .isInstanceOf(ObjectNotFoundException.class)
                .hasMessageContaining(String.format("Product with id %s not found", theId));

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
        products.add(new Product("title", "description", "img", null, 1, new ArrayList<>()));
        Page<Product> pagedProducts = new PageImpl(products);

        given(productRepository.findAll(pageable)).willReturn(pagedProducts);

        // when
        underTest.findPaginatedProducts(null, pageNo, pageSize);

        // then
        ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        then(productRepository).should().findAll(pageableArgumentCaptor.capture());

        Pageable pageableValue = pageableArgumentCaptor.getValue();
        Page<Product> thePageProducts = productRepository.findAll(pageableValue);
        assertThat(thePageProducts.getContent()).isEqualTo(products);
    }

    @Test
    void itShouldFindPageOfProductsByCategory() {
        // given
        String category = "category";
        int pageNo = 1;
        int pageSize = 2;
        Pageable pageable = PageRequest.of(pageNo -1, pageSize);
        List<Product> products = new ArrayList<>();
        products.add(new Product("title", "description", "img", category, 1, new ArrayList<>()));
        Page<Product> pagedProducts = new PageImpl<Product>(products);

        given(productRepository.findByCategory(category, pageable)).willReturn(pagedProducts);

        // when
        underTest.findPaginatedProducts(category, pageNo, pageSize);

        // then
        ArgumentCaptor<Pageable> pageableArgumentCaptor = ArgumentCaptor.forClass(Pageable.class);
        ArgumentCaptor<String> categoryArgumentCaptor = ArgumentCaptor.forClass(String.class);

        then(productRepository).should().findByCategory(categoryArgumentCaptor.capture(), pageableArgumentCaptor.capture());

        Pageable pageableValue = pageableArgumentCaptor.getValue();
        String categoryValue = categoryArgumentCaptor.getValue();

        Page<Product> thePageProducts = productRepository.findByCategory(categoryValue, pageableValue);
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
        products.add(new Product("title", "description", "img", category, 1, new ArrayList<>()));

        given(productOptionsRepository.findProductsBySize(productSize)).willReturn(products);

        // when
        underTest.findPaginatedProducts(category, pageNo, pageSize);

        // then
        ArgumentCaptor<Integer> productSizeArgumentCaptor = ArgumentCaptor.forClass(Integer.class);

        then(productOptionsRepository).should().findProductsBySize(productSizeArgumentCaptor.capture());

        int productSizeValue = productSizeArgumentCaptor.getValue();
        List<Product> theListProducts = productOptionsRepository.findProductsBySize(productSizeValue);
        Page<Product> productsPage = new PageImpl<>(theListProducts, pageable, theListProducts.size());

        assertThat(productsPage.getContent()).isEqualTo(products);
    }

}