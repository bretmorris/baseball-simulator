AFRAME.registerComponent("reset-baseball", {
  init: function () {
    var el = this.el;
    el.addEventListener("animationcomplete", function (evt) {
      el.object3D.position.set(0, 2, -18.4404);
      el.getAttribute("position");
    });
  },
});

AFRAME.registerComponent("trigger-listener", {
  init: function () {
    var el = this.el;
    el.addEventListener("triggerdown", function (evt) {
      document.getElementById("ball").emit("throw");
    });
  },
});
/**
 * Keyboard bindings to control controller and create actions via events.
 * Position controllers in front of camera.
 * <a-scene debug-controller> ?debug in URL to toggle on.
 */
AFRAME.registerComponent("debug-controller", {
  schema: {
    enabled: { default: false },
  },

  init: function () {
    var primaryHand;
    var secondaryHand;

    if (!this.data.enabled && !AFRAME.utils.getUrlParameter("debug")) {
      return;
    }

    console.log("%c debug-controller enabled ", "background: #111; color: red");

    this.isTriggerDown = false;

    primaryHand = document.getElementById("primaryHand");
    secondaryHand = document.getElementById("secondaryHand");

    secondaryHand.setAttribute("position", { x: -0.2, y: 1.5, z: -0.5 });
    primaryHand.setAttribute("position", { x: 0.2, y: 1.5, z: -0.5 });
    secondaryHand.setAttribute("rotation", { x: 35, y: 0, z: 0 });
    primaryHand.setAttribute("rotation", { x: 35, y: 0, z: 0 });

    document.addEventListener("keydown", (evt) => {
      var primaryPosition;
      var primaryRotation;

      // <shift> + * for everything.
      if (!evt.shiftKey) {
        return;
      }

      // <space> for trigger.
      if (evt.keyCode === 32) {
        primaryHand.emit("triggerdown");
        return;
      }

      // Position bindings.
      primaryPosition = primaryHand.getAttribute("position");
      if (evt.keyCode === 72) {
        primaryPosition.x -= 0.01;
      } // h.
      if (evt.keyCode === 74) {
        primaryPosition.y -= 0.01;
      } // j.
      if (evt.keyCode === 75) {
        primaryPosition.y += 0.01;
      } // k.
      if (evt.keyCode === 76) {
        primaryPosition.x += 0.01;
      } // l.
      if (evt.keyCode === 59 || evt.keyCode === 186) {
        primaryPosition.z -= 0.01;
      } // ;.
      if (evt.keyCode === 222) {
        primaryPosition.z += 0.01;
      } // ;.

      // Rotation bindings.
      primaryRotation = primaryHand.getAttribute("rotation");
      if (evt.keyCode === 89) {
        primaryRotation.x -= 10;
      } // y.
      if (evt.keyCode === 79) {
        primaryRotation.x += 10;
      } // o.

      primaryHand.setAttribute("position", AFRAME.utils.clone(primaryPosition));
      primaryHand.setAttribute("rotation", AFRAME.utils.clone(primaryRotation));
    });
  },
});
