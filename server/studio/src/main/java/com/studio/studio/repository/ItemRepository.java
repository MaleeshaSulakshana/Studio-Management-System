package com.studio.studio.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.studio.studio.entity.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, String> {

}
