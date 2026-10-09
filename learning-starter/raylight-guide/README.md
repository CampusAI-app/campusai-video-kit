# Raylight's design guide, saved locally

Raylight publishes its own craft guide through its connector (`get_design_guide`): the timing,
easing, text and camera rules its in-app director runs on, the measured numbers behind them, and a
beat sheet for every official template. It is the best motion reference we have.

Reading it costs one Raylight call per topic, and the free plan allows 50 a week. So read each topic
once and save it here, then read the file instead of calling again.

**First time:** call `get_design_guide` with topic `craft-rules`, then `measured-craft`, and save
each as a markdown file in this folder (`craft-rules.md`, `measured-craft.md`). That is two calls.

**When a video needs a specific template's motion:** call `get_design_guide` for that template's
topic (`list_templates` names them), save it here as `<template-slug>.md`, and reuse it next time.

**Refresh** a saved topic if it is more than a couple of months old, since Raylight updates its
templates.

These files are Raylight's content, saved for our own reference. Keep them in this folder and do not
publish or share them anywhere else.
