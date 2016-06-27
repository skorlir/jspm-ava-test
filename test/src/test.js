import test from 'ava';
import {returnTrue} from '~/test';

test('Test', assert => {
    let actual = test();
    let expected = true;

    assert.is(actual, expected,
        'returnTrue() should return true.');
});
