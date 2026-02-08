CREATE TABLE `sys_token_blacklist` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(256) NOT NULL,
	`token` varchar(256) NOT NULL,
	`expires_at` varchar(256) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp,
	`deleted_at` timestamp,
	CONSTRAINT `sys_token_blacklist_id` PRIMARY KEY(`id`)
);
