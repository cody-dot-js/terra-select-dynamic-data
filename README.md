# terra-select-dynamic-data

Demonstrating how `terra-form-select` breaks down when used with asynchronous data.

## Directions

Run the app in your preferred method below. The `terra-form-select` will *"fetch"* some randomly generated, unique data with a random delay based upon the input's `searchValue` used as a *"query"*. Make some selections and search another query and notice that the `terra-form-select` does not persist the user facing presentational text (the `display`), but falls back to the `value`. ☹️

### Run locally:

```sh
yarn install
yarn start
```
