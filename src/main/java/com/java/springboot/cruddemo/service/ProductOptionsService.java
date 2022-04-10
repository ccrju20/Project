package com.java.springboot.cruddemo.service;

import java.util.List;

import com.java.springboot.cruddemo.dao.ProductRepository;
import com.java.springboot.cruddemo.entity.Product;
import com.java.springboot.cruddemo.exception.ObjectNotFoundException;
import com.java.springboot.cruddemo.exception.ObjectRetrievalException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.ProductOptionsRepository;
import com.java.springboot.cruddemo.entity.ProductOption;

@Service
public class ProductOptionsService {

    private final ProductOptionsRepository productOptionsRepository;
    private final ProductRepository productRepository;

    @Autowired
    public ProductOptionsService(ProductOptionsRepository theProductOptionsRepository, ProductRepository theProductRepository) {
        productOptionsRepository = theProductOptionsRepository;
        productRepository = theProductRepository;
    }

    public List<ProductOption> findAllOptions() {
        return productOptionsRepository.findAll();
    }

    public ProductOption findOptionById(int theId) {
        ProductOption productOption = productOptionsRepository.findByOptionId(theId)
                .orElseThrow(() -> new ObjectNotFoundException(String.format("Product Option id %s not found", theId)));

        return productOption;
    }

    public List<ProductOption> findOptionsByProductId(int theId) {
        productRepository.findById(theId)
                .orElseThrow(() -> new ObjectRetrievalException("Did not find options with Product id " + theId));

        return productOptionsRepository.findByProductId(theId);
    }

    public void saveOption(ProductOption theProductOption) {
        theProductOption.setId(0);
        productOptionsRepository.save(theProductOption);
    }

    public void updateOption(ProductOption theProductOption) {
        productOptionsRepository.save(theProductOption);
    }

    public void deleteOptionById(int optionId) {
        productOptionsRepository.findByOptionId(optionId)
                .orElseThrow(() -> new ObjectRetrievalException("Did not find product option id " + optionId));

        int theId = productOptionsRepository.findIdByOptionId(optionId);

        productOptionsRepository.deleteById(theId);
    }

}
