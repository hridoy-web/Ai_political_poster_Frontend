//  Server Component
import { GeneratorWorkspace } from "../client/generator-workspace";
import { DEFAULT_CANDIDATE_INFO, SLOGAN_TOPICS } from "../generator.service";

export async function GeneratorPageContent() {
    const initialCandidate = DEFAULT_CANDIDATE_INFO;
  const topics = SLOGAN_TOPICS;

  return(
    <section>
         <GeneratorWorkspace
         initialCandidate={initialCandidate}
        sloganTopics={topics}
         >
            
         </GeneratorWorkspace>
    </section>
  )

}