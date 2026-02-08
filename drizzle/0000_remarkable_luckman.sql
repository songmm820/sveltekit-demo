CREATE TABLE `sys_refresh_tokens` (
	`id` varchar(256) NOT NULL,
	`user_id` varchar(256) NOT NULL,
	`refresh_token` varchar(256) NOT NULL,
	`expires_at` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `sys_refresh_tokens_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sys_token_blacklist` (
	`id` varchar(256) NOT NULL,
	`user_id` varchar(256) NOT NULL,
	`token` varchar(256) NOT NULL,
	`expires_at` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `sys_token_blacklist_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sys_users` (
	`id` varchar(256) NOT NULL,
	`nick_name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`hashed_password` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `sys_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_users_email` UNIQUE(`email`)
);
