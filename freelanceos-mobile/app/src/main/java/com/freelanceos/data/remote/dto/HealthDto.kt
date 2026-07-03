package com.freelanceos.data.remote.dto

data class HealthDto(
    val success: Boolean,
    val data: HealthDataDto?
)

data class HealthDataDto(
    val status: String,
    val database: String,
    val timestamp: String?
)
