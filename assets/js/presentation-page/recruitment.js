"use strict";

const selector = 'timeline';

(function(document, selector) {
    class AnimatedTimeline {
        constructor(orderedListOfStep) {
            this.stepTimer = 1500;
            this.currentStepIndex = null;
            this.steps = [];
            this.timer;

            if (!(orderedListOfStep instanceof HTMLOListElement)) {
                throw "The Animated Timeline plugin requires an html ordered list to work";
            }
            this.steps = Array.from(orderedListOfStep.children);
            // foreach step add listener hover
            this.steps.forEach((step, index) => step.addEventListener('mouseover', ()=>{this.hover(step, index)}));
            this.steps.forEach(step => step.addEventListener('mouseout', ()=>{this.out()}));
            this.currentStepIndex = 0;
        };
        execute() {
            this.updateCurrentStep();
            this.timer = setInterval(() => {
                this.currentStepIndex++;
                this.updateCurrentStep();
            }, this.stepTimer);

        };
        hover(step, index) {
            clearInterval(this.timer);
            this.currentStepIndex= index;
            this.updateCurrentStep();

        };
        out() {
            this.execute();
        };
        updateCurrentStep(step = null) {
            if (step instanceof HTMLDataListElement) {
                this.steps.forEach(step => step.classList.remove('complete'));
                step.classList.add('complete');

                return;
            }

            if (step !== null) {
                throw "Updating the current step requires either a list item or nothing.";
            }

            if (this.currentStepIndex > this.steps.length - 1) {
                this.currentStepIndex = 0;
            }
            this.steps.forEach(step => step.classList.remove('complete'));
            this.steps[this.currentStepIndex].classList.add('complete');
        };
    }

    (new AnimatedTimeline(document.getElementById(selector))).execute();
})(document, selector);
