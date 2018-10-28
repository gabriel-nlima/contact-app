package com.example.contacts

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.web.bind.annotation.CrossOrigin

@CrossOrigin("*")
interface ContactRepository : JpaRepository<Contact, Long>
