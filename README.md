# Kiara Anderson's Streamlined Submission

## Running the app

`npm start` Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

You may need to run `npm install`

Upon "saving" the form, an output is logged to the console. I recommend pasting this output to [JSON Formatter][https://jsonformatter.org/json-pretty-print] for easier viewing.

## Notes

I created this project with [Create React App](https://github.com/facebook/create-react-app) biolerplate and [MaterialUI][https://mui.com/] components.

When I started this assignment, I decided I would like to build the form "from scratch" rather than using a package (like react-hook-form or formik). Would I do this in a realistic production application scenario? No.
I chose to do this for this exercise because it is so small scale that it felt like a good oportunity to refresh on React basics. This did ultimately end up biting me a bit in the end - form validation could have been much neater with one of the previously mentioned packages. Since I also chose to time box this activity, there is one feature that suffered: though the form validates and only submits when valid, errors within the invoice line items do not highlight the affected input. Again, due to time boxing, a few small visual design specifics may also differ slightly.

A few other things that I would do differently in a real scenario:
 - Include unit tests
 - Format all numbers to proper decimals
 - Make components more generic to allow for re-use
 - Use MuI's theme provider to style components
 - Include accessibility features
 - check propTypes for each component
 - likely persist aspects of the state in local or session storage

## Assumptions

In creating this application, I made a number of assumptions. A few are listed below.
 - This application is meant to be used on desktop only
 - Negative totals are acceptable (assuming it is possible to be giving a refund)
 - Any unassigned value should be submitted as `null`
 - The title of "New draft" is not editable

