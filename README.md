# Overview

Note with examples to illustrate the use cases of functions, hooks in react.

This repo also includes the common problems when working with react and how to solve those problems.

## When to use useEffect() and useLayoutEffect()

[Link to the code](https://github.com/turbo8p/react-usecase-note/blob/master/src/useeffect-and-uselayouteffect/UseLayoutEffectAndUseEffect.js)

Statement about `useEffect()` from [React documentation](https://reactjs.org/docs/hooks-reference.html#useeffect): 
> However, not all effects can be deferred. For example, a DOM mutation that is visible to the user must fire synchronously before the next paint so that the user does not perceive a visual inconsistency. 

> For these types of effects, React provides one additional Hook called `useLayoutEffect`

This section shows you the example that will illustrate what exactly does the above statement means.

**Visual inconsistency** 

![2021-11-12_7-44-06](https://user-images.githubusercontent.com/26110220/141389386-2a571d05-2afc-452a-b01e-087b0cc67d44.gif)


**Explaination:**

With `useEffect()`, the effect of making 🟢 color **is defered** after paint. So browser will paint the 🔴 color first and then the effect takes place afterward.


With `useLayoutEffect()` the effect of making 🟢 color **is not deferred**. **Before the browser has a chance to paint**, the effect is taken place already.

** If the effect you put in the `useLayoutEffect()` is slow and take long time to process, this will result in UI blocking (not render until your effect computation is done). So you need to evaluate your problem before implemeting the solution.