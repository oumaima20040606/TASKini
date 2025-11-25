package com.taskini.userservice.dto;

public class UserResponse {

    private Long id;
    private String fullName;
    private String email;
    private String phone;
    private String location;
    private String role;

    public UserResponse(Long id, String fullName, String email, String phone, String location, String role) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.role = role;
    }

    public Long getId() { return id; }
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getLocation() { return location; }
    public String getRole() { return role; }
}
