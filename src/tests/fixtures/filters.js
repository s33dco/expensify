import moment from "moment"

const filters = {
	text: "",
	sortBay: "date",
	startDate: undefined,
	endDate: undefined
}

const altFilters = {
	text: "",
	sortBay: "date",
	startDate: moment(0),
	endDate: moment(0).add(3, "days")
}

export { filters, altFilters }
