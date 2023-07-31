# TypeScript 与 Java/C# 的区别

对于习惯了其它带有静态类型语言（如 Java 和 C#）的程序员来说，TypeScript 是一个很好的选择。TypeScript 的类型系统提供了许多相似的特性。比如，更好的代码补全、更早的错误检测以及程序各部分之间更清晰的通信。虽然 TypeScript 为这些开发人员提供了许多熟悉的特性，但还是有必要回过头来看看 JavaScript（以及 TypeScript）与传统的面向对象语言有何不同。理解这些差异将帮助你写出更好的 JavaScript 代码，并避免直接从 Java/C# 转到 TypeScript 的程序员掉入常见的陷阱。

## 学习 JavaScript

如果你是一名 Java 或 C# 程序员，并且已经熟悉 JavaScript 的使用，那么这个介绍性页面可以帮助你解释一些可能遇到的常见疑惑和陷阱。TypeScript 的类与 Java 和 C# 有很大的不同，在学习 TypeScript 时记住这些是很重要的。

如果你是一名 Java 或 C# 程序员，并且是 JavaScript 的新手，我们建议你先学习一点不带类型的 JavaScript，以了解 JavaScript 的运行时行为。因为 TypeScript 不会改变代码的运行方式，所以你仍然需要学习 JavaScript 是如何工作的，才能真正了解自己写的代码如何运行。

要记住，TypeScript 和 JavaScript 使用相同的运行时，所以任何关于如何完成特定运行时行为的资源（如将字符串转换为数字、将文件写入磁盘等）同样适用于 TypeScript 程序。不要把自己局限于 TypeScript 特有的资源。

## 重新思考类

Java 和 C# 是典型的面向对象语言。在这些语言中，类是组成代码的基本单元，也是运行时所有数据和行为的基本容器。对于某些场景，将所有数据和行为保存在类中可能是一个很好的做法，但并不是每种场景都适合这种方式。

### 函数和数据

在 JavaScript 中，函数可以存在于任何地方，数据可以自由传递而无需在 `class` 中预定义。这种灵活性是非常强大的，没有面向对象层次结构的“自由”（不与类关联）函数往往是用来编写 JavaScript 程序的首要选择。

### 静态类

此外，Java 和 C# 中的某些特定结构如单例和静态类在 TypeScript 中也不是必需的。

### TypeScript 中的面向对象

如果你喜欢，仍然可以使用类。有些问题很适合通过传统的面向对象层次结构来解决，而 TypeScript 和 JavaScript 对类的支持将使这些模型更加强大。TypeScript 支持许多常见的特性，例如实现接口、继承和静态方法。

## 重新思考类型

TypeScript 对类型的理解实际上与 Java 以及 C# 有很大的不同。让我们一块来探讨一些不同之处。

### 标称具体化类型系统

在 Java 和 C# 中，任何给定的值或对象都有一个确切的类型（基本类型、引用类型或 `null`）。我们可以调用 `value.getType()` 或 `value.getClass()` 等方法在运行时查询确切的类型。这种类型的定义将存在于具有某种名称的某个类中，除非存在显式继承关系或相同的接口实现，否则我们不能使用具有相似形状的两个类来代替彼此。这描述了一个具体化的、标称的类型系统 - 我们在代码中编写的类型在运行时出现，并且类型通过它们的声明而不是通过它们的结构相关联。

### 类型是集合

在 Java 或 C# 中，考虑运行时类型与其编译时声明之间的一对一的对应关系是有意义的。但是在 TypeScript 中，可以把类型看作是一组有共同之处的值的集合。正因为在 TypeScript 中类型只是集合，所以一个特定的值可以同时属于多个集合。

一旦你开始将类型看作集合，某些操作就变的非常自然。例如，在 Java 和 C# 中，无法将一个变量表示为既可以是 `string` 类型，也可以是 `int` 类型。

而在 TypeScript 中，一旦你意识到每个类型都是一个集合，这就变得很自然了。如何描述一个变量既可以是 `string` 类型（属于 `string` 集），也可以是 `number` 类型（属于 `number` 集）呢？只需要将这个变量表示为这两个集合的并集：`string | number`。

TypeScript 提供了许多以集合论的方式处理类型的机制，如果你把类型看作集合，你会发现它们更直观。

### 结构类型

在 TypeScript 中，对象不是单一的精确类型。例如，如果我们构造一个满足某个接口的对象，我们可以在期望该接口的地方使用该对象，即使两者没有声明性关系。

```ts
interface PointLike {
  x: number
  y: number
}

interface Named {
  name: string
}

function logPoint(point: PointLike) {
  console.log(`x = ${point.x}, y = ${point.y}`)
}

function logName(x: Named) {
  console.log(`Hello, ${x.name}`)
}

const obj = {
  x: 0,
  y: 0,
  name: 'Origin'
}

logPoint(obj)
logName(obj)
```

**TypeScript 的类型系统是结构型而不是标称型的。** 我们可以把 `obj`（或者说 `obj` 所对应的类型） 当作 `PointLike` 来使用，因为它的 `x` 和 `y` 属性都是数字。类型之间的关系是由它们所包含的属性决定的，而不是它们是否声明了某种特定的关系。

**TypeScript 的类型系统也没有被具体化。** 在运行时没有任何东西会告诉我们 `obj` 是 `PointLike` 类型。事实上， `PointLike` 类型在运行时不会以任何形式出现。

再回到我们之前说过的类型是集合的说法，这里我们可以将 `obj` 视为 `PointLike` 值集和 `Named` 值集的成员。

## 结构类型的特殊性

面相对象程序员经常对结构类型的两个特殊方面感到惊讶。

### 空类型

空类型似乎不符合预期：

```ts
class EmptyObj {}

function fn(arg: EmptyObj) {
  // do something...
}

// 传参不是空对象，但是为何不报错？
fn({ k: 10 })
```

TypeScript 通过查看所提供的参数是否为有效的 `EmptyObj` 来判断这里对 `fn` 的调用是否有效。它通过检查 `{ k: 10 }` 与 `EmptyObj` 的结构做到这一点。我们可以看到 `{ k: 10 }` 具有 `EmptyObj` 所具有的所有属性（因为 `EmptyObj` 没有任何属性），因此这是一个有效的调用。

这看起来可能非常不可思议，但它最终与传统面相对象语言中强制的类型关系非常类似。子类不能删除其父类的属性，因为这样做会破坏子类与父类之间的继承关系。结构类型系统通过描述具有兼容类型属性的子类型，简单隐式地定义这种关系。

### 相同的类型

另一种看起来不可思议的是两个相同的类型可以相互赋值：

```ts
class Car {
  drive() {
    // hit the gas
  }
}

class Golfer {
  drive() {
    // hit the ball far
  }
}

// 为何没有报错？
const w: Car = new Golfer()
```

<!-- TODO link -->

同样，这不是错误，因为这两个类的结构是相同的。这看起来让人非常疑惑，在实践中，这种情况应该避免，因为两个结构相似的类不应该毫无关联。一般这种情况会通过继承等方式进行改造，我们可以在类一章中了解更多关于类之间的关系。

## 反射

面向对象程序员习惯于能够查询任何值的类型，甚至是泛型：

```c#
static void LogType<T>() {
    Console.WriteLine(typeof(T).Name);
}
```

因为 TypeScript 的类型系统会在编译时完全去除，所以关于泛型类型参数实例化的信息在运行时是不可用的。

JavaScript 确实有一些操作符，例如 `typeof` 和 `instanceof`，但请记住，这些操作符仍然在处理值，因为它们存在于类型去除后的输出代码中。例如，`typeof new Car()` 将是 `object` 而不是 `Car`。
