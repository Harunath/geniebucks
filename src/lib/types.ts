export interface userType {
	id: number;
	email: string;
	firstname: string;
	lastname: string;
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

// Enums
export enum GenderTypes {
	Male = "Male",
	Female = "Female",
	Other = "Other",
	PreferNotToSay = "PreferNotToSay",
}

export enum EmiStatus {
	PENDING = "PENDING",
	PAID = "PAID",
	OVERDUE = "OVERDUE",
}

export enum ProfessionTypes {
	Employed = "Employed",
	SelfEmployed = "SelfEmployed",
	Business = "Business",
	Student = "Student",
	Retired = "Retired",
	Unemployed = "Unemployed",
}
