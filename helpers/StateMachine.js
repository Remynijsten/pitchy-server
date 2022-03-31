class StateMachine {
    states          =
    [
        'participants',
        'countdown',
        'question',
        'story',
        'subresults',
        'endresults'
    ]
    index           = 0
    state_index     = 0
    total_questions = 8

    load_next_state() {
        switch(this.state_index) {
            case 3:
                if(this.index >= this.total_questions) this.state_index = 5; // Skip subresults on end
                else {
                    this.state_index++;
                }
            break;

            case 4:
                this.index++
                this.state_index = 2;
            break;

            case 5:
                break;

            default:
                this.state_index++;
            break;
        }
        return { state : this.states[this.state_index], index : this.index }
    }
}

module.exports = StateMachine