////////////////////////////////////////////////////////////////////////////////////
// check if the current implementation has any issues
////////////////////////////////////////////////////////////////////////////////////

// const handlers: { [key: string]: Function } = {};

// const trigger = (type: string): void => {
//   handlers[type]();
// };

// const on = (type: string, handler: Function): void => {
//   handlers[type] = handler;
// };

// on("foo", (): void => {
//   console.log("Do foo");
// });

// trigger("foo");

////////////////////////////////////////////////////////////////////////////////////
// How do we let you add more than 1 handler for the same type?
////////////////////////////////////////////////////////////////////////////////////

// const handlers: { [key: string]: Array<Function> } = {};

// const trigger = (type: string): void => {
//   handlers[type].forEach((handler: Function) => handler());
// };

// const on = (type: string, handler: Function): void => {
//   handlers[type] ? handlers[type].push(handler) : (handlers[type] = [handler]);
// };

// on("foo", (): void => {
//   console.log("Do foo");
// });

// on("foo", (): void => {
//   console.log("Do some other foo");
// });

// trigger("foo");

////////////////////////////////////////////////////////////////////////////////////
// How do we add an off method?
////////////////////////////////////////////////////////////////////////////////////

// const handlers: { [key: string]: Array<Function> } = {};

// const trigger = (type: string): void => {
//   handlers[type].forEach((handler: Function) => handler());
// };

// const on = (type: string, handler: Function): void => {
//   handlers[type] ? handlers[type].push(handler) : (handlers[type] = [handler]);
// };

// const off = (type: string, handler: Function): void => {
//   if (handlers[type])
//     handlers[type].forEach((handler2: Function, index: number) => {
//       if (handler2.toString() === handler.toString()) {
//         handlers[type].splice(index, 1);
//       }
//     });
// };

// on("foo", (): void => {
//   console.log("Do foo");
// });

// on("foo", (): void => {
//   console.log("Do some other foo");
// });

// off("foo", (): void => {
//   console.log("Do some other foo");
// });

// trigger("foo");

////////////////////////////////////////////////////////////////////////////////////
// How do I allow you to pass arbitrary arguments?
////////////////////////////////////////////////////////////////////////////////////

// const handlers: { [key: string]: Array<Function> } = {};

// const trigger = (type: string, args?: Array<string>): void => {
//   handlers[type].forEach((handler: Function) => {
//     args ? handler(args) : handler();
//   });
// };

// const on = (type: string, handler: Function): void => {
//   handlers[type] ? handlers[type].push(handler) : (handlers[type] = [handler]);
// };

// const off = (type: string, handler: Function) => {
//   if (handlers[type])
//     handlers[type].forEach((handler2: Function, index: number) => {
//       if (handler2.toString() === handler.toString()) {
//         handlers[type].splice(index, 1);
//       }
//     });
// };

// on("foo", (): void => {
//   console.log("Do foo");
// });

// on("foo", (): void => {
//   console.log("Do some other foo");
// });

// off("foo", (): void => {
//   console.log("Do some other foo");
// });

// on("foo", (args?: Array<string>) => {
//   args ? console.log("Here are my args:", args.toString()) : console.log("No args");
// });

// trigger("foo", ["arg1", "arg2"]);
