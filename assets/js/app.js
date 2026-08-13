"use strict";


document.addEventListener(
    "DOMContentLoaded",
    function () {

        const menuButton =
            document.querySelector(
                ".mobile-menu-btn"
            );

        const navigation =
            document.querySelector(
                ".main-nav"
            );


        if (!menuButton || !navigation) {
            return;
        }


        menuButton.addEventListener(
            "click",
            function () {

                navigation.classList.toggle(
                    "mobile-open"
                );

                menuButton.classList.toggle(
                    "active"
                );

                const isOpen =
                    navigation.classList.contains(
                        "mobile-open"
                    );

                menuButton.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );

            }
        );

    }
);
