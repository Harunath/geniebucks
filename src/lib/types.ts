export interface userType {
	id: number;
	email: string;
	name: string;
	gender: GenderTypes;
	transactions: transactionTypes[];
	profession: ProfessionTypes;
	Emis: emiTypes[];
	setSpendLimit: boolean;
	spendingLimit: number | null | undefined;
	createdAt: Date;
	updatedAt: Date;
}

export interface transactionTypes {
	id: number;
	userId: number;
	amount: number;
	type: TransactTypes;
	source: string;
	category: string;
	description: string;
	date: Date;
}
export interface emiTypes {
	id: number;
	userId: number;
	amount: number;
	to: string;
	for: string;
	status: EmiStatus;
	installmentNumber: number;
	totalInstallments: number;
	dueDate: Date;
	endDate: Date;
	date: Date;
	notes: string;
}

export enum TransactTypes {
	expense = "expense",
	income = "income",
}

export enum GenderTypes {
	Male = "Male",
	Female = "Female",
	Other = "Other",
	PreferNotToSay = "PreferNotToSay",
}

export enum EmiStatus {
	PENDING,
	PAID,
	OVERDUE,
}

export enum ProfessionTypes {
	Employed,
	SelfEmployed,
	Business,
	Student,
	Retired,
	Unemployed,
}
