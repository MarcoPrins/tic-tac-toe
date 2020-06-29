import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | scores', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders scores for each player', async function(assert) {
    this.set('scores', {x: 1, o: 3});

    await render(hbs`<Scores @scores={{this.scores}} />`);

    let scores = findAll('.score');
    assert.equal(scores.length, 2);
    assert.equal(scores[0].textContent.trim(), 'Player x: 1');
    assert.equal(scores[1].textContent.trim(), 'Player o: 3');
  });
});
