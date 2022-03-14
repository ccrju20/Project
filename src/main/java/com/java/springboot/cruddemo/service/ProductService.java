package com.java.springboot.cruddemo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.java.springboot.cruddemo.exception.ObjectNotFoundException;
import com.java.springboot.cruddemo.exception.ObjectRetrievalException;
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

    public List<Product>  findAll() {
        return productRepository.findAll();
    }

    public Product findById(int theId) {
        Product result = productRepository.findById(theId)
                .orElseThrow(() -> new ObjectNotFoundException(String.format("Product with id %s not found", theId)));

        return result;
    }

    public void update(Product theProduct) {
        productRepository.save(theProduct);
    }

    public void save(Product theProduct) {
        theProduct.setId(0);
        productRepository.save(theProduct);
    }

    public void deleteById(int theId) {
        productRepository.findById(theId)
                .orElseThrow(() -> new ObjectNotFoundException(String.format("Product with id %s not found", theId)));

        productRepository.deleteById(theId);
    }

    public Map<String, Object> findPaginatedProducts(String category, int pageNo, int pageSize) {
        Page<Product> pageProducts;

        if (category != null) {
            if (NumberUtils.isCreatable(category)) {
                int size = NumberUtils.createInteger(category);
                List<Product> products = productOptionsRepository.findProductsBySize(size);
                Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
                pageProducts = new PageImpl<>(products, pageable, products.size());
            } else {
                Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
                pageProducts = productRepository.findByCategory(category, pageable);
            }

        } else {
            Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
            pageProducts = productRepository.findAll(pageable);
        }

        List<Product> products = pageProducts.getContent();

        if (!products.isEmpty()) {
            Map<String, Object> response = new HashMap<>();
            response.put("products", products);
            response.put("currentPage", pageProducts.getNumber());
            response.put("totalItems", pageProducts.getTotalElements());
            response.put("totalPages", pageProducts.getTotalPages());
            return response;
        }

        throw new ObjectRetrievalException("Unable to retrieve products");
    }

}
