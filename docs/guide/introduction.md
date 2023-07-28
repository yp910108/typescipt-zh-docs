# 简介

恭喜你选择 TypeScript 作为你的第一语言，你的决定是正确的！

你可能已经听说过 TypeScript 是 JavaScript 的一种“风格”或“变体”。TypeScript(TS) 和 JavaScript(JS) 之间的关系在现在编程语言中是相当独特的，所以更多地了解这种关系将有助于你理解 TypeScript 是如何添加到 JavaScript 中的。

## JavaScript 简史

JavaScript（也称为 ECMAScript）最初是作为一种简单的浏览器脚本语言出现的。在它刚问世的时候，它被用于嵌入网页中的简单代码片段。在那时候，用它编写超过几十行的代码就已经非常罕见了。然而，随着时间的推移，JavaScript 变得越来越流行，更多的 Web 开发者开始用它创建更丰富的交互。

Web 浏览器开发人员为了应对 JavaScript 使用量的增加，通过动态编译和添加新的 API 来优化他们的浏览器执行引擎。然而，这又使得更多的 Web 开发者使用 JavaScript。在现在的网站中，你的浏览器经常运行超过数十万行代码的应用程序。这是 Web 漫长而渐进的成长过程，从简单的静态页面，演变成各种丰富的应用平台。

不仅如此，JavaScript 已经变得非常流行，它还可以被运行在浏览器之外的环境。例如，通过 Node.js 实现一个 JavaScript 服务器。JavaScript “随处运行”的特性使得它成为跨平台开发的一个有利选择。现在有许多开发人员只使用 JavaScript 作为他们的整个技术栈。

总而言之，我们有一种为快速使用而设计的语言，它可以编写数百万行的应用程序。然而，每种语言都有它的“怪癖”，JavaScript 也不例外，草率的开端使得它存在很多这样的“怪癖”。例如：

- JavaScript 的相等操作符（`==`）强转它的操作对象，导致意想不到的结果：

```js
if ('' == 0) {
  // 为什么这里会执行？
}

const x = 5
if (1 < x < 3) {
  // 无论 x 是什么值，这里都会执行
}
```

- JavaScript 还允许访问不存在的属性：

```js
const obj = { width: 10, height: 15 }
// height 拼写错误，因此 area 的结果是 NaN
const area = obj.width * obj.heigth
```

当这类错误发生时，大多数的编程语言都会抛出错误，有些甚至会在编译期间（代码运行之前）抛出错误。当编写小型程序时，这类“怪癖”是可控的，但是当编写成百上千行代码的应用程序时，这类“怪癖”是一个很大的麻烦。

## TypeScript - 静态类型检查器

我们上面说有些语言会在编译期间抛出这类错误。这种在不运行代码的情况下检查代码中的错误被成为静态检查，而根据被操作值的类型来确定哪些是错误哪些不是错误的检查器被称为静态类型检查器。

TypeScript 可以在程序执行前根据值的类型检查程序的错误，因此它是一个静态类型检查器。例如上面的第二个示例，TypeScript 根据 `obj` 的类型发现 `obj.heigth` 在 `obj` 中不存在，因此它抛出一个错误：

```ts
const obj = { width: 10, height: 15 }
// Property 'heigth' does not exist on type
// '{ width: number; height: number; }'. Did you mean 'height'?
const area = obj.width * obj.heigth // [!code error]
```

那么 TypeScript 和 JavaScript 到底有什么关系呢？

### 语法

TypeScript 是 JavaScript 的超集，因此 JavaScript 的语法（语法指的是我们编写文本以形成程序的方式）是合法的 TypeScript。例如这段代码有一个语法错误，因为它缺少一个`)`：

```ts
// ')' expected.
const a = (4 // [!code error]
```

TypeScript 不会因为语法问题认为一段 JavaScript 代码是错误的。这意味着，你可以把任何有效的 JavaScript 代码放到 TypeScript 文件中，而不需要担心它到底是怎么写的。

### 类型

然而，TypeScript 是一个类型化的超集。这意味着它添加了许多关于如何使用不同类型的值的规则。之前 `obj.heigth` 的错误不是一个语法错误，而是一个类型错误（以错误的方式使用了某种值）。

下面是另外一个例子，你可以在浏览器中运行这一段 JavaScript 代码，他会打印 `Infinity`：

```js
console.log(4 / [])
```

这段 JavaScript 的语法是合法的。然而，TypeScript 却认为数字除以数组是一个没有意义的操作，并会抛出一个错误：

```ts
// The right-hand side of an arithmetic operation must be of
// type 'any', 'number', 'bigint' or an enum type.
console.log(4 / []) // [!code error]
```

你可能真的想要用一个数字除以一个数组，也许只是想要测试下会发生什么，但是在大多数情况下这是一个编程错误。TypeScript 的类型检查器被设计成允许正确的程序通过，同时仍捕获尽可能多的常见错误（后面我们会学习如何设置 TypeScript 检查代码的严格程度）。

如果你将一些代码从 JavaScript 文件移动到 TypeScript 文件，你可能会看到类型错误，这取决于你代码的编写方式。这可能是代码本身的问题，也可能是 TypeScript 过于保守。在[指南](./basic)中，我们会演示如何添加各种 TypeScript 语法来消除这类错误。

### 运行时行为

TypeScript 保留了 JavaScript 的运行时行为。例如，在 JavaScript 中除以 0 会得到 `Infinity` 而不是抛出异常。**不改变 JavaScript 的运行时行为是 TypeScript 的一个基本原则。**

这意味着，如果你把代码从 JavaScript 转移到 TypeScript，即使 TypeScript 认为代码有错误，也会保证以相同的方式运行。

**与 JavaScript 保持相同的运行时是 TypeScript 的一个基本承诺。** 因此这意味着你可以很容易地在两种语言之间进行切换，而不必担心一些细微的差异会导致程序停止运行。

### 去除类型

粗略的说，一旦 TypeScript 的编译器完成了对代码的检查，他就会去除类型以生成最终的编译时代码。这意味着，代码编译完成之后，生成的纯 JavaScript 代码是没有类型信息的。

这也意味着 TypeScript 永远不会根据它推断的类型改变程序的行为。底线是，虽然在编译期间可能看到类型错误，但类型系统本身与程序运行时的工作方式无关。

最后，TypeScript 不提供任何额外的运行时库。你的程序将使用与 JavaScript 程序相同的标准库（或外部库）。因此，不需要额外学习特定于 TypeScript 的框架。

## 学习 JavaScript 和 TypeScript？

我们经常会看到这样的问题：“我应该学习 JavaScript 还是 TypeScript？”。

答案是，不学习 JavaScript 就无法学习 TypeScript。TypeScript 与 JavaScript 共享语法和运行时行为，所以你学到的任何 JavaScript 知识都会帮助你学习 TypeScript。

有很多供程序员学习的 JavaScript 资源，如果你正在学习 TypeScript，就不应该忽略这些资源。例如，StackOverflow 上标记为 JavaScript 的问题大约是 TypeScript 的 20 倍，但所有的 JavaScript 问题也同样适用于 TypeScript。

如果你正在搜索类似“如何在 TypeScript 中排序列表”这样的问题，记住：TypeScript 是带有编译时类型检查器的 JavaScript 运行时。在 TypeScript 中排序列表的方式与在 JavaScript 中是一样的。如果你找到了一个直接使用 TypeScript 的资源，那也很好，但不要局限地认为你需要特定于 TypeScript 的答案来解决运行时的问题。

## TypeScript 与 X 的区别是？

你可以查看[TypeScript 与 X 的区别](./compared-with-javascript)章节获取更多细节，了解 TypeScript 与其他语言的异同。
