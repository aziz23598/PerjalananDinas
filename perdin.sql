-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 18, 2025 at 04:37 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perdin`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('admin@admin.com|127.0.0.1', 'i:1;', 1758114585),
('admin@admin.com|127.0.0.1:timer', 'i:1758114585;', 1758114585);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kota`
--

CREATE TABLE `kota` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama_kota` varchar(255) NOT NULL,
  `provinsi` varchar(255) NOT NULL,
  `pulau` varchar(255) NOT NULL,
  `luar_negeri` tinyint(1) NOT NULL DEFAULT 0,
  `latitude` decimal(10,7) NOT NULL,
  `longitude` decimal(10,7) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kota`
--

INSERT INTO `kota` (`id`, `nama_kota`, `provinsi`, `pulau`, `luar_negeri`, `latitude`, `longitude`, `created_at`, `updated_at`) VALUES
(1, 'Jakarta', 'DKI Jakarta', 'Jawa', 0, -6.2088000, 106.8456000, '2025-09-15 22:13:13', '2025-09-16 05:17:58'),
(2, 'Surabaya', 'Jawa Timur', 'Jawa', 0, -7.2575000, 112.7521000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(3, 'Bandung', 'Jawa Barat', 'Jawa', 0, -6.9175000, 107.6191000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(4, 'Medan', 'Sumatera Utara', 'Sumatera', 0, 3.5952000, 98.6775000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(5, 'Yogyakarta', 'DI Yogyakarta', 'Jawa', 0, -7.7956000, 110.3695000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(6, 'Makassar', 'Sulawesi Selatan', 'Sulawesi', 0, -5.1477000, 119.4327000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(7, 'Manado', 'Sulawesi Utara', 'Sulawesi', 0, 1.4748000, 124.8421000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(8, 'Palu', 'Sulawesi Tengah', 'Sulawesi', 0, -0.8906000, 119.8707000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(10, 'Samarinda', 'Kalimantan Timur', 'Kalimantan', 0, -0.5074000, 117.1438000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(11, 'Banjarmasin', 'Kalimantan Selatan', 'Kalimantan', 0, -3.3167000, 114.5900000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(12, 'Denpasar', 'Bali', 'Bali', 0, -8.6705000, 115.2126000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(13, 'Jayapura', 'Papua', 'Papua', 0, -2.5332000, 140.8118000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(14, 'Kuala Lumpur', 'Wilayah Federal', 'Semenanjung Malaya', 1, 3.1390000, 101.6869000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(15, 'Singapura', 'Singapura', 'Singapura', 1, 1.3521000, 103.8198000, '2025-09-15 22:13:13', '2025-09-15 22:13:13'),
(16, 'Sydney', 'New South Wales', 'Australia', 1, -33.8688000, 151.2093000, '2025-09-16 04:55:46', '2025-09-16 04:55:46'),
(18, 'Tokyo', 'Tokyo', 'Honsyu', 1, 35.6762000, 139.6503000, '2025-09-17 05:05:13', '2025-09-17 05:05:13'),
(19, 'solo', 'jawa tengah', 'jawa', 0, -7.5559000, 110.8226000, '2025-09-17 05:06:41', '2025-09-17 05:06:41');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_09_16_031445_add_column_role_to_table_user', 2),
(5, '2025_09_16_044136_kota', 3),
(6, '2025_09_16_042925_perjalanan_dinas', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `perjalanan_dinas`
--

CREATE TABLE `perjalanan_dinas` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `asal_kota_id` bigint(20) UNSIGNED NOT NULL,
  `tujuan_kota_id` bigint(20) UNSIGNED NOT NULL,
  `tanggal_berangkat` date NOT NULL,
  `tanggal_kembali` date NOT NULL,
  `keterangan` text DEFAULT NULL,
  `status` enum('pending','approve','rejected') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `perjalanan_dinas`
--

INSERT INTO `perjalanan_dinas` (`id`, `user_id`, `asal_kota_id`, `tujuan_kota_id`, `tanggal_berangkat`, `tanggal_kembali`, `keterangan`, `status`, `created_at`, `updated_at`) VALUES
(2, 2, 5, 3, '2025-09-18', '2025-09-21', 'bootcamp', 'approve', '2025-09-16 19:21:05', '2025-09-17 01:17:03'),
(3, 2, 1, 2, '2025-09-17', '2025-10-08', 'pergi', 'pending', '2025-09-16 19:25:41', '2025-09-16 19:25:41'),
(4, 2, 5, 6, '2025-09-18', '2025-09-24', 'pergi', 'approve', '2025-09-16 19:59:16', '2025-09-17 04:30:54'),
(5, 2, 4, 3, '2025-09-16', '2025-09-24', 'yaaa', 'rejected', '2025-09-16 20:08:40', '2025-09-17 01:19:00'),
(6, 4, 8, 10, '2025-09-18', '2025-09-28', 'bootcamp', 'approve', '2025-09-17 04:28:05', '2025-09-17 04:30:43'),
(7, 4, 6, 12, '2025-09-25', '2025-10-01', 'healing', 'rejected', '2025-09-17 04:28:39', '2025-09-17 04:30:57'),
(8, 4, 5, 16, '2025-10-02', '2025-10-17', 'healing', 'rejected', '2025-09-17 04:33:45', '2025-09-17 05:12:16'),
(9, 4, 5, 19, '2025-09-18', '2025-09-18', 'main', 'approve', '2025-09-17 05:07:24', '2025-09-17 05:11:53'),
(10, 4, 5, 18, '2025-10-21', '2025-10-31', 'project nuklir', 'rejected', '2025-09-17 05:07:48', '2025-09-17 05:20:21');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('f9U8DLXWjBBANnEBVpkEa5fzHBLOTFl3TyGju03v', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiaWxqNmk0dHF5OEFLOE9kNGM0SDFSRUZhaDBZODlOMXRBQ2Jrc29LaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1758162117);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','user','SDM') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`) VALUES
(1, 'admin', 'admin@email.com', NULL, '$2y$12$FuQPtzUB7.Vt6GFnWQTJtOESWYy2o0Tz0LHDhkyG1zY0d3m132NFy', NULL, '2025-09-15 18:14:21', '2025-09-15 18:14:21', 'admin'),
(2, 'aziz', 'aziz@email.com', NULL, '$2y$12$ZE2CJQQ3Tm0MuMvO96K3p./qOq8XCpy/YvGiGMza0BxgPX7ZFLVLK', NULL, '2025-09-15 20:23:29', '2025-09-15 20:23:29', 'user'),
(3, 'kuncoro', 'kuncoro@email.com', NULL, '$2y$12$agzExEl71rvxpdfcNqdQBOHBrSukoChkYmA5yZ699m9ckmACNoOFm', NULL, '2025-09-15 20:32:49', '2025-09-15 21:11:23', 'SDM'),
(4, 'azkme', 'azkme@email.com', NULL, '$2y$12$/cRqaiibHRM6z.iLNC274ekl9tksQLb9s1NJ6EwXY/QUbr8fSsGPq', NULL, '2025-09-17 04:27:42', '2025-09-17 04:27:42', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kota`
--
ALTER TABLE `kota`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `kota_nama_kota_unique` (`nama_kota`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `perjalanan_dinas`
--
ALTER TABLE `perjalanan_dinas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `perjalanan_dinas_user_id_foreign` (`user_id`),
  ADD KEY `perjalanan_dinas_asal_kota_id_foreign` (`asal_kota_id`),
  ADD KEY `perjalanan_dinas_tujuan_kota_id_foreign` (`tujuan_kota_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kota`
--
ALTER TABLE `kota`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `perjalanan_dinas`
--
ALTER TABLE `perjalanan_dinas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `perjalanan_dinas`
--
ALTER TABLE `perjalanan_dinas`
  ADD CONSTRAINT `perjalanan_dinas_asal_kota_id_foreign` FOREIGN KEY (`asal_kota_id`) REFERENCES `kota` (`id`),
  ADD CONSTRAINT `perjalanan_dinas_tujuan_kota_id_foreign` FOREIGN KEY (`tujuan_kota_id`) REFERENCES `kota` (`id`),
  ADD CONSTRAINT `perjalanan_dinas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
