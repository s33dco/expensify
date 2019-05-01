import React from "react"
import moment from "moment"
import { shallow } from "enzyme"
import { SingleDatePicker } from "react-dates"
import ExpenseForm from "../../components/ExpenseForm"
import expenses from "../fixtures/expenses"

test("should render ExpenseForm correctly", () => {
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot()
})

test("should render ExpenseForm correctly with expense data", () => {
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)
	expect(wrapper).toMatchSnapshot()
})

test("should render error for invalid form submission", () => {
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot()
	wrapper.find("form").simulate("submit", {
		preventDefault: () => {}
	})
	expect(wrapper.state("error").length).toBeGreaterThan(0) // onSubmit handler
	expect(wrapper).toMatchSnapshot()
})

test("should set description on input change", () => {
	const value = "new description"
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot()
	wrapper
		.find("input")
		.at(0)
		.simulate("change", {
			target: { value }
		})
	expect(wrapper.state("description")).toBe(value) // onChange handler
	expect(wrapper).toMatchSnapshot()
})

test("should set note on textarea change", () => {
	const value = "this new note is for you"
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot()
	wrapper.find("textarea").simulate("change", {
		target: { value }
	})
	expect(wrapper.state("note")).toBe(value) // onChange handler
	expect(wrapper).toMatchSnapshot()
})

test("should set amount on change if valid", () => {
	const value = "23.23"
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot()
	wrapper
		.find("input")
		.at(1)
		.simulate("change", {
			target: { value }
		})
	expect(wrapper.state("amount")).toBe(value) // onChange handler
	expect(wrapper).toMatchSnapshot()
})

test("should render error for invalid amount on change", () => {
	const value = "23.232323"
	const wrapper = shallow(<ExpenseForm />)
	expect(wrapper).toMatchSnapshot()
	wrapper
		.find("input")
		.at(1)
		.simulate("change", {
			target: { value }
		})
	expect(wrapper.state("amount")).toBe("") // onChange handler
	expect(wrapper).toMatchSnapshot()
})

test("should call onSubmit prop for valid form submission", () => {
	const onSubmitSpy = jest.fn()
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
	wrapper.find("form").simulate("submit", { preventDefault: () => {} })

	expect(wrapper.state("error")).toBe("")
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description: expenses[0].description,
		amount: expenses[0].amount,
		note: expenses[0].note,
		createdAt: expenses[0].createdAt
	})
})

test("should set new date on date change", () => {
	const now = moment()
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find(SingleDatePicker).prop("onDateChange")(now)
	expect(wrapper.state("createdAt")).toEqual(now)
})

test("should set calendar focus on change", () => {
	const focused = true
	const wrapper = shallow(<ExpenseForm />)
	wrapper.find(SingleDatePicker).prop("onFocusChange")({ focused })
	expect(wrapper.state("calendarFocused")).toBe(focused)
})
