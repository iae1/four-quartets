import React from 'react'

class Line extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { initCharIdx, endCharIdx, line } = this.props
        console.log('initCharIdx->', this.props.initCharIdx)
        console.log('endCharIdx->', this.props.endCharIdx)
        return (
            <><span>{line}</span><br/></>
        )
    }
}

export default Line