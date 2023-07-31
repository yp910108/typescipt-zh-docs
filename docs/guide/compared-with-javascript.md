# TypeScript 与 JavaScript 的区别

TypeScript 与 JavaScript 有着不同寻常的关系。TypeScript 提供了 JavaScript 的所有特性，并且在这些特性之上又增加了一层 - TypeScript 的类型系统。

这意味着你现有的 JavaScript 代码也是 TypeScript 代码。TypeScript 的主要好处是，它可以高亮你代码中的错误行为，降低出 bug 的几率。

例如，JavaScript 提供了像 `string` 和 `number` 这样的基础类型，但是它并不会检查是否给这些基础类型分配了正确的值。但是 TypeScript 可以做到。

本节提供了 TypeScript 的简要概述，特别是它的类型系统。

## 类型推断

TypeScript 了解 JavaScript 的运行机制，并且在很多情况下会为你自动生成类型。例如，创建一个变量并给它赋一个值，TypeScript 将使用该值的类型作为这个变量的类型：

```ts
let helloWorld = 'Hello World'
```

<!-- TODO hover -->

::: tip 提示
如果你将鼠标悬浮在 `helloWorld` 之上，你将会看到 `let helloWorld: string`，这说明 `helloWorld` 是 `string` 类型。
:::

通过理解 JavaScript 的工作原理，TypeScript 可以构建一个类型系统。这个类型系统不需要显式地在你的代码上添加类型声明，它可以根据上下文自动推断变量的类型。这就是为什么在上面的例子中 TypeScript 知道 `helloWorld` 是 `string` 类型。

::: tip 提示
你可能已经在用 Visual Studio Code 编写 JavaScript 了，并且在使用编辑器的自动补全功能。Visual Studio Code 在底层就使用 TypeScript 来简化 JavaScript 的工作。
:::

## 定义类型

在 JavaScript 中你可以使用各种各样的设计模式。然而，有些设计模式使类型推断变得困难（例如，使用动态编程的模式）。为了涵盖这种情况，TypeScript 支持 JavaScript 语言的扩展，你可以显示的告诉 TypeScript 应该是什么类型。

首先，通过 `interface` 关键字声明一个类型（接口）：

```ts
interface User {
  id: number
  name: string
}
```

然后，你可以在变量声明后使用像 `const variable: TypeName` 这样的语法来显式的声明一个对象的类型：

```ts
const user: User = {
  id: 0,
  name: 'Hayes'
}
```

如果你提供的对象与你提供的接口不匹配，TypeScript 会警告你：

```ts
interface User {
  id: number
  name: string
}

// Type '{ id: number; username: string; }' is not assignable to type 'User'.
// Object literal may only specify known properties, and 'username' does not
// exist in type 'User'.
const user: User = {
  id: 0,
  username: 'Hayes' // [!code error]
}
```

由于 JavaScript 支持类和面向对象编程，TypeScript 也一样。你可以对类使用接口声明：

```ts
interface User {
  id: number
  name: string
}

class UserAccount {
  id: number
  name: string
  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }
}

const user: User = new UserAccount(1, 'Murphy')
```

你还可以使用 `interface` 为函数的参数和返回值进行类型注解：

```ts
function deleteUser(user: User) {
  /// ...
}

function getAdminUser(): User {
  // ...
}
```

JavaScript 中已经有一部分基本类型可以使用：`number`、`string`、`boolean`、`null`、`undefined`、`symbol`、`bigint`，你可以直接在 `interface` 中使用它们。另外，TypeScript 还扩展了更多类型，例如：

- `any`：可以是任何类型
- [`unknown`](https://www.typescriptlang.org/play#example/unknown-and-never)：确保使用者声明该类型
- [`never`](https://www.typescriptlang.org/play#example/unknown-and-never)：表示该类型不可能存在
- `void`：一个返回 `undefined` 或者没有返回值的函数

::: tip 提示
有两种构建类型的语法：[`interface`](https://www.typescriptlang.org/play?e=83#example/types-vs-interfaces) 和 [`type`](https://www.typescriptlang.org/play?e=83#example/types-vs-interfaces)。你应该更喜欢使用 `interface`，`type` 只会在特定情况下使用。
:::

## 组合类型

使用 TypeScript，你可以通过组合简单类型来创建复杂类型。有两种常用的创建复杂类型的方法：联合和泛型。

### 联合

你可以声明一个联合类型，这个类型可以是许多类型中的一种。例如，你可以将 `boolean` 类型描述为 `true` 或 `false`：

```ts
type MyBool = true | false
```

<!-- TODO hover -->

::: tip 提示
如果你将鼠标悬浮在 `MyBool` 之上，你将会看到它被归类为 `boolean` 类型。
:::

联合类型的一个常见用法是用来描述一个 `string` 或 `number` 字面量的集合：

```ts
type WindowStates = 'open' | 'closed' | 'minimized'
type LockStates = 'locked' | 'unlocked'
type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9
```

联合类型也提供了处理不同类型的方法。例如，你可能有一个接收 `string` 或 `array` 参数的函数，你可以根据传递给它的参数类型是 `string` 还是 `array` 返回不同的值：

```ts
function wrapInArray(obj: string | string[]) {
  if (typeof obj === 'string') {
    return [obj]
  }
  return obj
}
```

::: details 想要知道变量的类型，可以使用 typeof 操作符。
| 类型 | 表达式 |
| --------- | ------------------------ |
| number | typeof n === 'number' |
| string | typeof s === 'string' |
| boolean | typeof b === 'boolean' |
| undefined | typeof u === 'undefined' |
| symbol | typeof s === 'symbol' |
| bigint | typeof b === 'bigint' |
| function | typeof f === 'function' |
| array | Array.isArray(a) |
::: warning
这里需要注意，因为 `typeof null === 'object'`，因此无法使用 `typeof` 来判断一个变量是否为 `null`。
:::

### 泛型

泛型可以为类型提供参数。一个常见的例子是数组，没有泛型的数组可以包含任意类型的值，具有泛型的数组只能包含该泛型参数对应类型的值。

```ts
type StringArray = Array<string>
type NumberArray = Array<number>
type ObjectWidthNameArray = Array<{ name: string }>
```

你可以在声明类型时指定泛型参数，泛型参数可以是任意的类型：

```ts
interface Backpack<Type> {
  add: (obj: Type) => void
  get: () => Type
}

declare const backpack: Backpack<string>

const str = backpack.get()

// Argument of type 'number' is not assignable to parameter of type 'string'.
backpack.add(23) // [!code error]
```

::: tip 提示
`declare const backpack: Backpack<string>` 这一句是要告诉 TypeScript 有一个名为 `backpack` 的常量，而不用担它是否真的存在。
:::

## 结构类型系统

TypeScript 的一个核心原则就是类型检查基于值的形状。有时被称为“鸭子类型”或“结构类型”。

在结构类型系统中，如果两个对象具有相同的形状，则认为他们具有相同的类型：

```ts
interface Point {
  x: number
  y: number
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`)
}

const point = { x: 12, y: 26 }
logPoint(point)
```

`point` 变量没有被声明为 `Point` 类型，但是 TypeScript 会在类型检查中将 `point` 与 `Point` 的形状进行比较。因为它们具有相同的形状，所以代码通过了。

形状匹配只需要匹配对象字段的子集：

```ts
interface Point {
  x: number
  y: number
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`)
}

const point = { x: 12, y: 26, z: 89 }
logPoint(point)

const rect = { x: 33, y: 3, width: 30, height: 80 }
logPoint(rect)

const color = { hex: '#187ABF' }
// Argument of type '{ hex: string; }' is not assignable to parameter of type 'Point'.
// Type '{ hex: string; }' is missing the following properties from type 'Point': x, y
logPoint(color) // [!code error]
```

形状匹配也适用于类：

```ts
interface Point {
  x: number
  y: number
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`)
}

class VirtualPoint {
  x: number
  y: number
  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }
}

const newVPoint = new VirtualPoint(13, 56)
logPoint(newVPoint)
```

如果对象或类具有类型所必需的所有属性，TypeScript 会认为它们与类型匹配，而不管其实现细节如何。
