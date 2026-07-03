package com.freelanceos.data.repository

import com.freelanceos.data.remote.api.FreelanceOsApi
import com.freelanceos.data.remote.dto.HealthDto
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import javax.inject.Inject

sealed class Result<out T> {
    data class Success<out T>(val data: T) : Result<T>()
    data class Error(val exception: Exception) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

class HealthRepository @Inject constructor(
    private val api: FreelanceOsApi
) {
    suspend fun checkHealth(): Result<HealthDto> = withContext(Dispatchers.IO) {
        try {
            val response = api.getHealth()
            Result.Success(response)
        } catch (e: Exception) {
            Result.Error(e)
        }
    }
}
