CREATE TABLE `sys_refresh_tokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(256) NOT NULL,
	`refresh_token` varchar(256) NOT NULL,
	`expires_at` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `sys_refresh_tokens_id` PRIMARY KEY(`id`)
);
