CREATE TABLE `sys_users` (
	`id` int NOT NULL,
	`nickname` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp,
	`deletedAt` timestamp,
	CONSTRAINT `sys_users_id` PRIMARY KEY(`id`),
	CONSTRAINT `idx_users_email` UNIQUE(`email`)
);
