import React, {Component} from 'react'

const AUDIO = document.createElement('audio')

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlaying: false,
            audioSrc: ''
        }
        this.toggle = this.toggle.bind(this)
    }

    componentDidMount() {
        AUDIO.src = `../assets/${this.props.trackName}.wav`
        AUDIO.load()
    }

    play () {
        AUDIO.play()
        this.setState({isPlaying: true})
    }

    pause () {
        AUDIO.pause()
        this.setState({isPlaying: false})
    }

    toggle () {
        if (this.state.isPlaying) this.pause()
        else this.play()
    } 

    render () {  
        const {isPlaying} = this.state
        return (
            <div id='player-container'>
                <div id='player-controls'>
                    <div className='row center'>
                        <i className={isPlaying ? 'fa fa-pause-circle' : 'fa fa-play-circle'} onClick={this.toggle} />
                    </div>
                </div>
            </div>
        )
    }        
}

export default Player