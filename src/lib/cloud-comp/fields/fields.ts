// 设计字段类型
export const FieldEnum = {
	// 文本字段
	TEXT: 'text',
	// 富文本字段
	RICH_TEXT: 'rich_text',
	// 数字字段
	NUMBER: 'number'
} as const;

export type FieldEnumType = (typeof FieldEnum)[keyof typeof FieldEnum];

type FieldInfoType = {
	// 字段类型
	type: FieldEnumType;
	// 字段名称
	name: string;
};

// 字段信息
export const FieldInfoList: Record<FieldEnumType, FieldInfoType> = {
	[FieldEnum.TEXT]: {
		type: FieldEnum.TEXT,
		name: '文本'
	},
	[FieldEnum.RICH_TEXT]: {
		type: FieldEnum.RICH_TEXT,
		name: '富文本'
	},
	[FieldEnum.NUMBER]: {
		type: FieldEnum.NUMBER,
		name: '数字'
	}
};
