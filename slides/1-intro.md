# #1 どこやねん
怖くない関数型入門 | Kibela   
https://hrbrain.kibe.la/@suzuki_souma/502

---

# 🙅今日話さないこと🙅‍♂
- 全人類が関数型を使うべき、ということではない
    - 郷に入らば郷に従おう
- 型の基本的な話
- モナド

---

# 今日話すこと
- なぜ関数型
- 型を組み合わせる考え方
- 型の取り回し方
- 複雑なコードに対するアプローチ

---

# 前提
## Q. なぜ人々は関数型で書くのか？

---

# A. 「これはこういうものだ」って定義しておいたら勝手にアプリケーションが動き出してほしいから
- 細かい処理を考えたくない
- 明示的なニュアンスで記述してチーム間での意思疎通を潤滑にする
- 簡潔な記述でメンテナブルに

---

# 「これはこういうものだ」== 型

---

# 例. 型レベルパターンマッチ

```haskell
-- Enumみたいなの
data Action
    = Add Int   -- Add の時は必ず Int がくっついてくる
    | Reset

-- prevをどう変更するかを定義した関数
operator :: Int -> Action -> Int
operator prev action =
    case action of        -- switch/caseみたいなの
        Add n -> prev + n -- 返り値
        Reset -> 0        -- 返り値

main :: IO ()
main = do 
    putStrLn $ show $ operator 10 (Add 3)  -- -> 13
    putStrLn $ show $ operator 10 Reset    -- -> 0
```
