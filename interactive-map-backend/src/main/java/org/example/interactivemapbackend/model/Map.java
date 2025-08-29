package org.example.interactivemapbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import java.util.Objects;

@Entity
public class Map {
    @Id
    @GeneratedValue private long id;
    private long userId;
    private String imageUrl;
    private String imageType;

    public Map(long id, long userId, String imageUrl, String imageType) {
        this.id = id;
        this.userId = userId;
        this.imageUrl = imageUrl;
        this.imageType = imageType;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Map map = (Map) o;
        return id == map.id && userId == map.userId && Objects.equals(imageUrl, map.imageUrl)
                && Objects.equals(imageType, map.imageType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, userId, imageUrl, imageType);
    }
}
