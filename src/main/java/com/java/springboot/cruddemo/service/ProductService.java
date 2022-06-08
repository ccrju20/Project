package com.java.springboot.cruddemo.service;

import java.util.*;

import com.java.springboot.cruddemo.exception.ObjectNotFoundException;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.ProductOptionsRepository;
import com.java.springboot.cruddemo.dao.ProductRepository;
import com.java.springboot.cruddemo.entity.Product;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductOptionsRepository productOptionsRepository;

    @Autowired
    public ProductService(ProductRepository theProductRepository, ProductOptionsRepository theProductOptionsRepository) {
        productRepository = theProductRepository;
        productOptionsRepository = theProductOptionsRepository;
    }

    public List<Product>  findAllProducts() {
        return productRepository.findAll();
    }

    public Product findProductById(int theId) {
        Product result = productRepository.findById(theId)
                .orElseThrow(() -> new ObjectNotFoundException(String.format("Product with id %s not found", theId)));

        return result;
    }

    public void updateProduct(Product theProduct) {
        productRepository.save(theProduct);
    }

    public void saveProduct(Product theProduct) {
        theProduct.setId(0);
        productRepository.save(theProduct);
    }

    public void deleteProductById(int theId) {
        productRepository.findById(theId)
                .orElseThrow(() -> new ObjectNotFoundException(String.format("Product with id %s not found", theId)));

        productRepository.deleteById(theId);
    }

    public Map<String, Object> findPaginatedProducts(String category, int pageNo, int pageSize) {
        Page<Product> pageProducts;
        ArrayList<String> businessCategories = new ArrayList<>(
                Arrays.asList("cookie", "cake", "cupcake"));

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);

        if (!category.equals("all")) {
            if (NumberUtils.isCreatable(category)) {
                int size = NumberUtils.createInteger(category);
                List<Product> products = productOptionsRepository.findProductsBySize(size);
                pageProducts = new PageImpl<>(products, pageable, products.size());
            } else if (businessCategories.contains(category)){
                pageProducts = productRepository.findByCategory(category, pageable);
            } else {
                List<Product> otherProducts = productRepository.findByCategoryNotIn(businessCategories);
                pageProducts = new PageImpl<>(otherProducts, pageable, otherProducts.size());
            }

        } else {
            pageProducts = productRepository.findAll(pageable);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("products", pageProducts.getContent());
        response.put("currentPage", pageProducts.getNumber());
        response.put("totalItems", pageProducts.getTotalElements());
        response.put("totalPages", pageProducts.getTotalPages());

        return response;
    }
}
