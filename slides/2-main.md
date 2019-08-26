# 型を組み合わせる

---

## よくあるつまづきポイント
`A` を `C` にしたいけど `A -> B` の関数と `B -> C` の関数しかない

```typescript
type A = //...
type B = //...
type C = //...

const atob: (a: A) => B = //...
const btoc: (b: B) => C = //...

// ここで使いたい
const doSomethng: (f: (a: A) => C) => //...
```

---

## `atob` の返り値 `B` を `btoc` の引数に入れる

```typescript
doSomething(a => btoc(atob(a)))
```

---

## `a => btoc(atob(a))`   
これは実質 `A -> C` になるので `(f: (a: A) => C)` の型を満たせる

---

## 色々な型の関数をたくさん作っておくと、組み合わせるだけでアプリケーションが動く
スピーチと関数は短いほうが良い

---

# 

---

# 複雑なコードに対するアプローチ

---

## DBから取ってきたユーザー情報をマスクする関数を考える

```typescript
type User = {
    id: string
    name: string
    password: string // 外に出たらやばい
    paymentAt: string // 外に出たらやばい
}

/** この型に変換したい */
type UserOutput = {
    id: string
    name: string
}
```

```typescript
const users: User[] = getUsers()
const outputUsers: UserOutput[] = // ???
```

---

## 例1 forで回して消すパターン

```typescript
function toOutputUsers(users: User[]): UserOutput[] {
    let outputUsers: OutputUser[] = []
    
    for (const user of users) {
        delete user.paymentAt
        delete user.password
        outputUsers.push(user)
    }
    return outputUsers
}

const outputUsers: UesrOutput[] = toOutputUsers(users)
```

---

## Immutableにしたい😐

---

## 例2 mapを使った型変換

```typescript
const outputUsers = users.map(
    user => {
        const { _paymentAt, _password, ...outputUser } = user
        return outputUser
    }
)
```

---

## paymentAt と password のマスク処理を分離したい 🤔

---

## 例3 型の組み合わせを使ったパターン

```typescript
const removePayment = ({ _paymentAt, ...data }) => data
const removePassword = ({ _password, ...data }) => data

const outputUsers = users.map(
    user => removePayment(removePassword(user))
)
```

---

## 無名関数も取ってしまいたい

---

## 例4 関数合成したパターン

```typescript
const outputUsers = users.map(
    compose(removePayment, removePassword)
)
```
