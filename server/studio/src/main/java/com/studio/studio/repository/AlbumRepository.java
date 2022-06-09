package com.studio.studio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studio.studio.entity.Album;

public interface AlbumRepository extends JpaRepository<Album, String> {

}
