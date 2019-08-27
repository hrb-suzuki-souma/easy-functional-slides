# 気をつけること

---

## 複雑すぎる型は控えめに

`react-redux` の `connect` から抜粋   
ライブラリ以外でパッと見何を組み合わせたら良いかわからない関数を書くと混乱する

```typescript
export interface Connect {
    // tslint:disable:no-unnecessary-generics
    (): InferableComponentEnhancer<DispatchProp>;

    <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = {}>(
        mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>
    ): InferableComponentEnhancerWithProps<TStateProps & DispatchProp, TOwnProps>;

    <no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
        mapStateToProps: null | undefined,
        mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>;

    <no_state = {}, TDispatchProps = {}, TOwnProps = {}>(
        mapStateToProps: null | undefined,
        mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    ): InferableComponentEnhancerWithProps<
        ResolveThunks<TDispatchProps>,
        TOwnProps
    >;

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
        mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
        mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps>;

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
        mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
        mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
    ): InferableComponentEnhancerWithProps<
        TStateProps & ResolveThunks<TDispatchProps>,
        TOwnProps
    >;

    <no_state = {}, no_dispatch = {}, TOwnProps = {}, TMergedProps = {}>(
        mapStateToProps: null | undefined,
        mapDispatchToProps: null | undefined,
        mergeProps: MergeProps<undefined, undefined, TOwnProps, TMergedProps>,
    ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;

    <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, TMergedProps = {}, State = {}>(
        mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
        mapDispatchToProps: null | undefined,
        mergeProps: MergeProps<TStateProps, undefined, TOwnProps, TMergedProps>,
    ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;

    <no_state = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}>(
        mapStateToProps: null | undefined,
        mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
        mergeProps: MergeProps<undefined, TDispatchProps, TOwnProps, TMergedProps>,
    ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;

    <TStateProps = {}, no_dispatch = {}, TOwnProps = {}, State = {}>(
        mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
        mapDispatchToProps: null | undefined,
        mergeProps: null | undefined,
        options: Options<State, TStateProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<DispatchProp & TStateProps, TOwnProps>;

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
        mapStateToProps: null | undefined,
        mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>,
        mergeProps: null | undefined,
        options: Options<{}, TStateProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<TDispatchProps, TOwnProps>;

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
        mapStateToProps: null | undefined,
        mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
        mergeProps: null | undefined,
        options: Options<{}, TStateProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<
        ResolveThunks<TDispatchProps>,
        TOwnProps
    >;

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
        mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
        mapDispatchToProps: MapDispatchToPropsNonObject<TDispatchProps, TOwnProps>,
        mergeProps: null | undefined,
        options: Options<State, TStateProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<TStateProps & TDispatchProps, TOwnProps>;

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = {}>(
        mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
        mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
        mergeProps: null | undefined,
        options: Options<State, TStateProps, TOwnProps>
    ): InferableComponentEnhancerWithProps<
        TStateProps & ResolveThunks<TDispatchProps>,
        TOwnProps
    >;

    <TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, TMergedProps = {}, State = {}>(
        mapStateToProps: MapStateToPropsParam<TStateProps, TOwnProps, State>,
        mapDispatchToProps: MapDispatchToPropsParam<TDispatchProps, TOwnProps>,
        mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps>,
        options?: Options<State, TStateProps, TOwnProps, TMergedProps>
    ): InferableComponentEnhancerWithProps<TMergedProps, TOwnProps>;
    // tslint:enable:no-unnecessary-generics
}
```

---

## 関数合成が必要ない言語もある
RustやScalaのように `trait` を使ってプリミティブな型のレベルから自分の関数を生やせる場合など

```rust
use std::ops::Deref;

fn main() {
    let m = Meter::new(3.0);
    let p = Yard::new(3.0);
    println!("meter: {}, yard: {}", *m, *m.to_yard());
    println!("yard: {}, meter: {}", *p, *p.to_meter());
}

#[derive(Debug)]
struct Yard {
    value: f32
}

#[derive(Debug)]
struct Meter {
    value: f32
}

impl Deref for Yard {
    type Target = f32;
    
    fn deref(&self) -> &f32 {
        &self.value
    }
}

impl Deref for Meter {
    type Target = f32;
    
    fn deref(&self) -> &f32 {
        &self.value
    }
}

impl Yard {
    pub fn new(value: f32) -> Self {
        Self { value }
    }
    pub fn to_meter(&self) -> Meter {
        Meter { value: &self.value.clone() * 0.9144 }
    }
}

impl Meter {
    pub fn new(value: f32) -> Self {
        Self { value }
    }
    pub fn to_yard(&self) -> Yard {
        Yard { value: &self.value.clone() * 1.09361 }
    }
}

```

---

# Thank you
