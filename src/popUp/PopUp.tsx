import * as React from "react";
import { getMatchPatterns, saveMatchPattern } from "../storage";

interface PopUpState {
  matchPatterns: string[];
  matchPatternInput: string;
}

export class PopUp extends React.Component<{}, PopUpState> {
  public state: PopUpState = {
    matchPatterns: [],
    matchPatternInput: ""
  };

  constructor(props: {}) {
    super(props);

    this.addMatchPattern = this.addMatchPattern.bind(this);
    this.onMatchPatternInput = this.onMatchPatternInput.bind(this);
  }

  public componentDidMount() {
    getMatchPatterns().then((matchPatterns) => {
      this.setState({...this.state, matchPatterns});
    });
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.renderMatchPatterns(this.state.matchPatterns)}
        <input type="text" onChange={this.onMatchPatternInput} value={this.state.matchPatternInput}/>
        <button onClick={this.addMatchPattern}>Add</button>
      </div>
    );
  }

  private renderMatchPatterns(matchPatterns: string[]): JSX.Element[] {
    const elements: JSX.Element[] = [];

    matchPatterns.forEach((matchPattern, index) => {
      elements.push(<p key={index}>{matchPattern}</p>);
    });

    return elements;
  }

  private addMatchPattern() {
    const newMatchPattern = this.state.matchPatternInput;
    saveMatchPattern(newMatchPattern);
    const matchPatterns = this.state.matchPatterns.concat(newMatchPattern);
    this.setState({...this.state, matchPatterns, matchPatternInput: ""});
  }

  private onMatchPatternInput(event: React.FormEvent<any>) {
    const target = event.target as HTMLInputElement;
    this.setState({...this.state, matchPatternInput: target.value});
  }
}