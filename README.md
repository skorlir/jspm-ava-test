### Steps to Fix

1. Re-ran `jspm init` to fix jspm configuration.
2. For simplicity's sake, removed jspm.browser.js and jspm.dev.js (which were
   unused). In this case, jspm will put browser config in the `browserConfig`
   field of `jspm.config.js` and dev confing in the `devConfig` field of
   `jspm.config.js`. Pretty easy to follow, just fewer files lying around. If
   you have a lot of dev or browser config you can split it out later.
3. Set up `jspm.{browserConfig,nodeConfig}.paths` such that 'app/' => '/src/app'.
4. Stopped using "test" in pathnames due to its ambiguity (there's a `test/` and a
   `src/app/test`).
5. Added `babel-register` to package.json ava config (because you have to have
   that if you want to transpile your source files during testing).
6. Set up `.babelrc` so that transpiled source code would work with ava -
   namely, needed to have `"presets": ["es2015", "stage-2"]`. Otherwise babel
   will just spit out the same file but wrapped in an IIFE.

### Other Effects

JSPM thinks your main file is `src/app/app.js`. There isn't an `app.js`.
Therefore, `jspm run app` and `jspm build app` and `jspm bundle app` will fail -
until you create a `src/app/app.js` or change the name of jspm.packages.app.main
in package.json to a different file.

This is just because when I ran `jspm init` that was the default given. Easy to
change, though.

All your transpilation is being done with `babel`. It will use the settings in
your `.babelrc` both for jspm bundling/building and for testing. If you want to
change the settings for jspm bundling/building, you can do that in
`jspm.packages.app.meta[\*.js].babelOptions` in your `package.json`. Then your
`.babelrc` will only apply in every other case, such as running the babel cli or
running ava.

### Directory Structure

I personally find this directory structure very confusing. Are you writing tests
inside of your module's source directory? What is supposed to go in `test/`,
then? What's the difference, really, between `test/src` and `src/app/test`?

If you understand it and it works for you, then that's fine. I was just
confused.

### On the Gulpfile

You don't need it. JSPM handles its own build process very cleanly, and with
dramatically less boilerplate. Read up on the JSPM docs.

If you want to add gulp to your build process, you're probably just going to
make it slower and not gain any particular benefits. But that's your
prerogoative. And there are certainly things you can do with gulp in addition to
what JSPM takes care of, such as asset minification. I suggest however that you
just use JSPM itself, with its various options, for all your javascript
compilation. Then use gulp for all the stuff you want to do in addition to that.

Another bonus: your npm install speeds will go up because you won't be
installing a blumillion gulp plugins. :)

