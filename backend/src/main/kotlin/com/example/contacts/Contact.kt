package com.example.contacts

import java.time.LocalDate
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType.AUTO
import javax.persistence.Id

@Entity
data class Contact(
    @Id @GeneratedValue(strategy = AUTO)
    val id: Long,

    @Column(nullable = false)
    val name: String,

    val gender: Gender? = null,

    val birthday: LocalDate?,

    val email: String? = null,

    val phone: String? = null
)
