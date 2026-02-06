CREATE TABLE `sys_users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nick_name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`hashed_password` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `sys_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_users_email` UNIQUE(`email`)
);
