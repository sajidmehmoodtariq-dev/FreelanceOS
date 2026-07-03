package com.freelanceos.data.remote.api

import com.freelanceos.data.remote.dto.HealthDto
import retrofit2.http.GET

interface FreelanceOsApi {
    @GET("health")
    suspend fun getHealth(): HealthDto
}
