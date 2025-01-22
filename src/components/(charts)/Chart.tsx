import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
type dataType = {
	name: string;
	amount: number;
	entries: number;
};
function Chart({ data }: { data: dataType[] }) {
	return (
		<ResponsiveContainer width={"100%"} height={"90%"}>
			<LineChart data={data} width={200} height={100}>
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<CartesianGrid stroke="#00ff11" />
				<Line type="monotone" dataKey="amount" stroke="#82ca9d" />
			</LineChart>
		</ResponsiveContainer>
	);
}

export default Chart;
