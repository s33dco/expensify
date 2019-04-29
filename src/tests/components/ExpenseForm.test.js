import React from "react"
import { shallow } from "enzyme"
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
