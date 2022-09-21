export class SpinnerFunctions {

    static showSpinner() {
        document.getElementsByClassName("loading")[0].classList.remove('hide');
    }

    static hideSpinner() {
        document.getElementsByClassName("loading")[0].classList.add('hide');
    }

}